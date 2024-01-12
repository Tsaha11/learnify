const Admin = require("../models/admin");
const Instructor = require("../models/instructor");
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { Readable } = require('stream');
const cloudinary = require('cloudinary').v2;


const conn = mongoose.connection;
let gfs;
conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'doubts',
  });
});

          
cloudinary.config({ 
  cloud_name: 'desdkbhvz', 
  api_key: '822224579263365', 
  api_secret: 'kTX01qyk21TXjM3YPAdBd4YN6ps' 
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nibarond94@gmail.com', // Your Gmail email address
    pass: 'mfeu ndqh rnju dbnp', // Your Gmail password or an app-specific password
  },
});


// Function to upload file to Cloudinary
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: 'auto' },
          (error, result) => {
              if (error) reject(error);
              resolve(result.secure_url);
          })
          .end(file.buffer);
  });
};

module.exports.signuppost = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("here");
  try {
    const profileImage = req.file;

    const profileImageUrl = await uploadToCloudinary(profileImage);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        message: "User with this eamil alread exists!"
      })
      return;
    }

    const admin = new Admin({
      username: username,
      email: email,
      password: hashedPassword,
      profileImage: profileImageUrl,
    });

    await admin.save();
    console.log(admin);
    const token = jwt.sign({ email: admin.email, role: "admin" }, process.env.ADMIN_JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({
      message: "SignUp successfull",
      token: token
    });
  } catch (err) {
    console.log(err);
  }
}


module.exports.loginpost = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email });
    console.log(admin);
    const validPassword = await bcrypt.compare(password, admin.password);

    if (!admin) {
      res.status(404).send("User Not Present");
      return;
    }

    if (!validPassword) {
      res.status(404).send("Invalid Password");
      return;
    }

    const token = jwt.sign(
      {
        id: admin.id,
        role: "admin"
      },
      process.env.ADMIN_JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: "Login successfull",
      token: token
    });

  } catch (err) {
    console.log(err);
  }
}


module.exports.getAdminData = async (req, res) => {
  const token = req.headers.token;
  try {
    const data = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
    const id = data.id;
    const admin = await User.findById(id);
    return res.status(200).json({
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: "admin",
      profileImage: admin.profileImage
    });

  } catch (err) {
    res.status(404).json({
      message: "Authorization failed"
    })
  }
}


module.exports.approveInstructor = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("approve");

    const instructor = await Instructor.findByIdAndUpdate(id, { isApproved: true }, { new: true });

    if (!instructor) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // sending approval mail to instructor
    await sendApprovalEmail(instructor.email);

    res.status(200).json({ message: 'User approved successfully.' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error approving instructor.' });
  }
}

async function sendApprovalEmail(userEmail) {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: userEmail,
    subject: 'Your Account has been Approved',
    // text: 'Congratulations! Your account has been approved. You can now log in.',
    // html : `
    // <h1>Congratulations! Your account has been approved. You can now <a href="http://localhost:3000/instructor/signup">log in</a> </h1>
    // `
    html: `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Account Approved</title>
          <style>
              body {
                  margin: 0;
                  padding: 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  height: 80vh; /* Adjusted height */
                  background: #f4f4f4;
              }
      
              .container {
                  text-align: center;
                  background-color: #ffffff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
      
              .background-image {
                  background-image: url('your-background-image.jpg');
                  background-size: cover;
                  background-position: center;
                  height: 100px; /* Adjusted height */
                  border-radius: 8px 8px 0 0;
              }
      
              h1 {
                  color: #007bff;
                  margin-top: 20px;
              }
      
              p {
                  font-size: 18px;
                  color: #333;
                  margin: 0;
              }
      
              a {
                  color: #28a745;
                  text-decoration: none;
                  font-weight: bold;
              }
      
              a:hover {
                  text-decoration: underline;
              }
          </style>
      </head>
      
      <body>
      
          <div class="container">
              <div class="background-image"></div>
      
              <!-- Content -->
              <h1>Congratulations!</h1>
              <p>Your account has been approved. You can now <a href="http://localhost:3000/instructor/signup" style="color: #28a745; text-decoration: none; font-weight: bold;">log in</a>.</p>
          </div>
      
      </body>
      
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Approval email sent to:', userEmail);
  } catch (error) {
    console.error('Error sending approval email:', error);
    throw error;
  }
}

module.exports.denyInstructor = async (req, res) => {
  try {
    const { id } = req.body;

    // Find the instructor first
    const instructor = await Instructor.findById(id);

    if (!instructor) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Sending denial email to instructor
    await sendDenialEmail(instructor.email);

    await Instructor.deleteOne({ _id: id });

    res.status(200).json({ message: 'User denied and deleted successfully.' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error denying instructor.' });
  }
}

async function sendDenialEmail(userEmail) {
  const rejectionMailOptions = {
    from: 'your-email@gmail.com',
    to: userEmail,
    subject: 'Your Account Approval Request has been Denied',
    html: `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Account Approval Denied</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 80vh; /* Adjusted height */
                    background: #f4f4f4;
                }

                .container {
                    text-align: center;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }

                .background-image {
                    background-image: url('your-background-image.jpg');
                    background-size: cover;
                    background-position: center;
                    height: 100px; /* Adjusted height */
                    border-radius: 8px 8px 0 0;
                }

                h1 {
                    color: #dc3545; /* Red color for denial */
                    margin-top: 20px;
                }

                p {
                    font-size: 18px;
                    color: #333;
                    margin: 0;
                }

                a {
                    color: #007bff; /* Blue color for link in denial */
                    text-decoration: none;
                    font-weight: bold;
                }

                a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>

        <body>

            <div class="container">
                <div class="background-image"></div>

                <!-- Content -->
                <h1>Account Approval Denied</h1>
                <p>We regret to inform you that your account approval request has been denied. If you have any concerns, please <a href="mailto:your-email@gmail.com" style="color: #007bff; text-decoration: none; font-weight: bold;">contact us</a>.</p>
            </div>

        </body>

        </html>
    `
  };

  try {
    await transporter.sendMail(rejectionMailOptions);
    console.log('Rejection email sent to:', userEmail);
  } catch (error) {
    console.error('Error sending rejection email:', error);
    throw error;
  }
}

module.exports.getPendingRequests = async (req, res) => {
  const pendingInstructors = await Instructor.find({ isApproved: false });
  const pendingAdmins = await Admin.find({ isApproved: false });

  const result1 = pendingInstructors.map(val => {
    return {
      id: val.id,
      username: val.username,
      email: val.email,
      profileImage: val.profileImage
    }
  });
  const result2 = pendingAdmins.map(val => {
    return {
      id: val.id,
      username: val.username,
      email: val.email,
      profileImage: val.profileImage
    }
  });

  res.json({
    pendingInstructors: result1,
    pendingAdmins: result2
  });
}


