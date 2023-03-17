
class ProductManager {
    constructor() {
        this.products= []
        this.lastId = 0;
    }

    addProduct = (title, description, price, thumbnail, code, stock)=>{
        const product = { title, description, price, thumbnail, code, stock , id: ++this.lastId,}
        const existingCode = this.products.find((product) => product.code === code)

        if(existingCode){
            console.log("ya existe un producto con ese codigo")
        }
        else if(!title || !description || !code || !thumbnail || !price || !stock){
            console.log("Todos los campos son obligatorios!")
        }else{
            this.products.push(product)
        }
    }

    getProducts = () =>{
        return this.products
    }
    getProductById = (id)=>{
        const product = this.products.find(product=>product.id === id)
        return product? product : console.log('Not Found')
    }
}



//testing
const testing = new ProductManager()

console.log('*TEST 1* Muestra array vacio', testing.getProducts())

testing.addProduct('producto de prueba', 'este es unproducto de prueba', 200, 'sin imagen', 'abc123', 25)
testing.addProduct('2 producto de prueba', '2 este es unproducto de prueba', 2200, '2 sin imagen', 'abc1234', 225)
testing.addProduct('3 producto de prueba', '3 este es unproducto de prueba', 3200, '3 sin imagen', 'abc12345', 3225)

console.log('*TEST 2* Muestra todos los productos agregados, se agrega id y se valida los campos ', testing.getProducts()) 

console.log('*TEST 3* Prueba error al agregar producto con un "code" ya existente')// devuelve error por el code repetido
testing.addProduct('producto de prueba', 'este es unproducto de prueba', 200, 'sin imagen', 'abc123', 25)


console.log('*TEST 4* Muestra producto por id, sino existe arraja not found ')//devuelve el producto con el id o not found si no existe
console.log(testing.getProductById(5))




