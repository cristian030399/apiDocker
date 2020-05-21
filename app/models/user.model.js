module.exports = mongoose => {
    const User = mongoose.model(
        "user",
        mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            userName: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            }
        }, { timestamps: true })
    );
    return User;
};