const AuthSchema = require('../models/register');
const { response } = require('../routes/empRoutes');
const { getEncodedPassword, DecodedToken } = require('../utils/Index');
const { GenerateAccessToken, GenerateRefreshToken, verifyAccessToken, verifyRefreshToken } = require('../utils/token');

const registerUser = async (req, res) => {
    const { firstname, lastname, email, password, cpassword } = req.body;
    try {

        const alreadyExists = await AuthSchema.findOne({ email });
        if (alreadyExists) {
            return res.status(404).json({ error: "User with this email already Exists" })
        }
        // if (!firstname || !lastname || !email || !password || !cpassword) {
        //     return res.status(401).json({ error: "fill all the required fields" });
        // }
        if (password !== cpassword) {
            return res.status(400).json({ error: "Password and Confirm password must be same" });
        } else if (password.length < 6) {
            return res.status(400).json({ error: "Password Should contains atleast 6 characters" });
        }
        const encodedPassword = await getEncodedPassword(password);

        const createdUser = await AuthSchema.create({
            firstname,
            lastname,
            email,
            password: encodedPassword
        });
        if (!createdUser) {
            return res.status(400).json({ error: "Something went wrong! Try after sometimes" })
        }
        return res.status(200).json({ message: "User created successfully" })
    }
    catch (error) {
        console.log('error:in creating user ', error);
        return res.status(500).json({ error: "Internal server error" })
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let access;
        let refresh;
        if (!password || !email) {
            return res.status(401).json({ error: "Invalid email or password " })
        }
        const searchUser = await AuthSchema.findOne({ email });
        if (!searchUser) {
            return res.status(404).json({ error: "User not found" });
        };

        const newPassword = await DecodedToken(password, searchUser?.password);

        if (!newPassword) { return res.status(401).json({ error: "Invalid email and password" }) }
        const query = {
            email: email,
            refresh_token: { $exists: true, $ne: null }, // Check if refresh_token exists and is not null

        };
        const searchRefreshTok = await AuthSchema.findOne(query);


        // if user logged in first Time
        if (!searchRefreshTok) {
            access = await GenerateAccessToken({ user_id: searchUser._id });
            refresh = await GenerateRefreshToken({ user_id: searchUser._id });
            if (refresh) {
                const updateUser = await AuthSchema.findByIdAndUpdate(searchUser._id,
                    { refresh_token: refresh },
                    { new: true, runValidators: true }
                )
                if (!updateUser) {
                    return res.status(500).json({ error: "Something went wrong! Please try again later" })
                }
            } else {
                return res.status(500).json({ error: "Something went wrong! Please try again later" })
            }
        }

        /* if user logged in second time then it first check ,
          token is valid or not and if it is valid
         then it will generate new access token otherwise it
         will gentate new refersh as well as accesstoken bothen and store refresh token into database*/


        else {
            const verify_refresh = await verifyRefreshToken({ refresh: searchUser?.refresh_token });
            if (verify_refresh?.valid) {
                access = await GenerateAccessToken({ user_id: searchUser._id });
                refresh = searchUser?.refresh_token;
            } else {
                refresh = await GenerateRefreshToken({ user_id: searchUser._id });
                access = await GenerateAccessToken({ user_id: searchUser._id });
                if (refresh) {
                    const updateUser = await AuthSchema.findByIdAndUpdate(searchUser._id,
                        { refresh_token: refresh },
                        { new: true, runValidators: true }
                    )
                    if (!updateUser) {
                        return res.status(500).json({ error: "Something went wrong! Please try again later" })
                    }
                } else {
                    return res.status(500).json({ error: "Something went wrong! Please try again later" })
                }
            }
        }
        return res.status(200).json({
            refresh: refresh,
            access: access,
            userDetails:{

                email: searchUser.email,
                firstname: searchUser.firstname,
                lastname: searchUser.lastname,
                user_id: searchUser._id
            }
        })

    } catch (error) {
        console.log('error: ', error);
        throw error

    }

};

const refreshToken = async (req, res) => {
    const { refreshtoken } = req.body;

    if (!refreshtoken) {
        return res.status(401).json({ message: 'Refresh Token required' });
    }
    try {
        const user = await AuthSchema.findOne({ refresh_token: refreshtoken });
        if (!user || user.refresh_token !== refreshtoken) {
            return res.status(403).json({ message: 'Invalid Refresh Token' });
        };
        let newAccessToken;
        let newRefreshToken
        const decoded = await ({ refresh: refreshtoken })
        if (!decoded.valid) {verifyRefreshToken

             newAccessToken = await GenerateAccessToken({user_id:user._id});
             newRefreshToken = await GenerateRefreshToken({user_id:user._id});

            // Save new refresh token to database
            user.refresh_token = newRefreshToken;
            await user.save();

            return res.status(200).json({ access: newAccessToken, refresh: newRefreshToken });
        }else{

            return  res.status(200).json({ message:"refresh token is valid",access: newAccessToken, refresh: newRefreshToken  });
        }

    } catch (err) {
        console.log('err: ', err);
        return res.status(500).json({ error: "Internal server error" })
    }
};

const logout = async (req, res) => {
    try {
        const { user_id } = req.user.decoded;
    

        if (!user_id) {
            return res.status(400).json({ error: 'User ID is missing in the request.' });
        }

        const isUser = await AuthSchema.findByIdAndUpdate(
            user_id,
            { refresh_token: null },
            { new: true, runValidators: true }
        );

        if (!isUser) {
            return res.status(404).json({ error: 'User not found or already logged out.' });
        }

        console.log('isUser: ', isUser);
        res.status(200).json({ message: 'Logout successful.'});
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};



module.exports = { registerUser, login, refreshToken,logout }