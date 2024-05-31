

class CartRepository{
    constructor(cartDao){
        this.dao=cartDao
    }
    getCarts = async () => await this.dao.get()
    getCartBy = async (filter) => await this.dao.getBy(filter)
    getCartByEmail = async (filter) => await this.dao.getByEmail(filter)
    createCart = async (newCart) => await this.dao.create(newCart)
    addProductToCart = async (cid,cartToUpdate) => await this.dao.addProduct(cid,cartToUpdate)
    deleteProductFromCart = async (cid,pid) => await this.dao.deleteItem(cid,pid)
    updateCartProducts = async (cid,newCart) => await this.dao.updateCartProducts(cid,newCart)
    deleteCart = async (cid) => await this.dao.delete(cid)
}

export default CartRepository