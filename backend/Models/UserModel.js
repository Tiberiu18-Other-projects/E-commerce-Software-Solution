import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},

    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true, default: false},
    sex: {type: String, required: true},
    ageGroup: {type: String, required: true},
    favoriteColors: {type: Array, required: true},
    favoriteFlowers: {type: Array, required: true},
    cluster: {type: Number, required: true},

},
{
    timestamps: true
});


// Login
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

//Register
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    

});



const User = mongoose.model('User', userSchema);


export default User;