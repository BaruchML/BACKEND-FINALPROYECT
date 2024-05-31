class UserDto {
    constructor(user) {
        this.full_name = `${user.first_name} ${user.last_name}`
        this.first_name = user.first_name
        this.last_name = user.last_name
        this.email = user.email
        this.password = user.password
        this.age = user.age
        this.cart = user.userCart
        this.role = user.role
        this.thumbnail = ""
    }
    static getName = (user) => {
        return {
            name: `${user.first_name} ${user.last_name}`
        }
    }

}

export default UserDto