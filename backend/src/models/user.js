import mongoose  from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        username:{ type: String, required:true, trim:true},
        email:{
            type: String,
            required: [true, "Email id is required"],
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters long"],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
);

//hash the password before saving the user document
userSchema.pre('save', async function(next){
    if (!this.isModified('password'))return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);    
})

//instance method to compare the password entered by the user with the hashed password stored in the database

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare( enteredPassword, this.password);
}

// Never leak passwords in the response, so we will remove the password field from the user object before sending it back to the client

userSchema.set('toJSON', {
    transform: function(doc, ret, options) {
         delete ret.password;
    delete ret.__v;
    return ret;
    }
});

const User = mongoose.model('User', userSchema);
export default User;