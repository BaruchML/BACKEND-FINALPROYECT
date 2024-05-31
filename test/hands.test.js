import mongoose from "mongoose";
import UserDto from "../src/dto/userDto.js";
import { chai } from "@bundled-es-modules/chai";
import { createHash, isInvalidPassword } from "../src/utils/hashBcrypt.js";

const expect = chai.expect
mongoose.connect('mongodb://127.0.0.1:27017/clase21')

describe('Testing de bcrypt utility', () => {
    it('El servicio debe devolver un hash valido de password', async function () {
        const password = '123aaa'
        const passwordHash = await createHash(password)
        // console.log(passwordHash);
        expect(passwordHash).to.not.equal(password)
    })
    it('Testing de isInvalidPassord', async function () {
        const password = '123aaa'
        const passwordHash = await createHash(password)
        // console.log(passwordHash);
        const isValid = await isInvalidPassword({ password: passwordHash }, password)
        expect(isValid).to.be.true
        expect(isValid).to.equal(true)
    })
})

describe('Testing de user dto', () => {
    before(function () {
        this.UserDto = UserDto
    })
    it('el dto de user debe devolver solo el nombre', function () {
        let mockUser = {
            first_name: 'Baruch',
            last_name: 'Prueba test',
            full_name: 'A ver si si sale',
            email: 'Baruch@aaaaaa.com',
            password: '123aaa'
        }
        const resultHansDto = this.UserDto.getName(mockUser)
        expect(resultHansDto).to.have.property('name', 'Baruch Prueba test')
    })
})
