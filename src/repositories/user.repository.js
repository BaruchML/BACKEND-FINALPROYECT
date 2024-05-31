import UserDto from "../dto/userDto.js"

class UserRepository {
    constructor(userDao) {
        this.dao = userDao
    }

    getUsers = async () => await this.dao.get({})
    getUsersPremium = async (filter) => await this.dao.getPremium(filter)

    getUserBy = async (filter) => await this.dao.getBy(filter)

    getUserById = async (uid) => await this.dao.getById(uid)

    createUser = async (newUser) => {
        const newUserDto = new UserDto(newUser)
        await this.dao.create(newUserDto)
    }

    updateUser = async (uid, userToUpdate) => await this.dao.update(uid, userToUpdate)

    updateUserToPremium = async (uid) => await this.dao.updatePremium(uid)

    deleteUser = async (uid) => await this.dao.delete(uid)

}
export default UserRepository