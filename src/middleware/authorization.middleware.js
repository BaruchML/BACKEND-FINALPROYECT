
//VALIDAREMOS EL ROLE
export const authorization = roleArray => {
    return async (req, res, next) => {
        if (roleArray[0] === 'PUBLIC') return next()
        if (!req.user) return res.status(401).json({ status: "error", error: 'Unauthorized' })
        if (!roleArray.includes(req.user.role.toUpperCase())) return res.status(401).json({ status: "error", error: 'Not permission' })
        next()
    }
}