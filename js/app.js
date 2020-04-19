class Products{
    async getCatalog(){
        let result = await fetch('../products.json');
        let data = await result.json();
        let catalog = data.catalog;


        catalog = catalog.map(catalog =>{
            const id = catalog.id;
            const img = catalog.img;
            const title = catalog.title;
            return {
                id,
                img,
                title
            }
        })

        return catalog;
    }
    async getProducts(){
        let result = await fetch('../products.json');
        let data = await result.json();
        let products = data.products;


        products = products.map(product =>{
            const catId = product.catalogId;
            const image = product.img;
            const title = product.title;
            const id = product.id
            return {
                catId,
                image,
                title,
                id
            }
        })
        return products
    }
}

class UI{
    displayCatalog(catalog, products){
        let result = '';
        catalog.forEach(cat =>{
            result +=`
            <div class="col-md-3 col-sm-6">
            <a href="#catalog_list" class="card" id="${cat.id}">
                <img src="${cat.img}" alt="">
                <div class="opacity"></div>
                <div class="title">
                    ${cat.title}
                </div>
            </a>
            </div>
            `;
        })
        backbtn.style.display = "none" 
        catalogList.innerHTML = result;
        this.productHandler(catalog, products);
    }
    productHandler(catalog, products){
        const card = document.querySelectorAll('.card');
        for(let i = 0; i < card.length ; i++){
            card[i].addEventListener('click', ()=>{
                this.displayProducts(card[i].id, products, catalog)     
            })
        }
        
    }
    displayProducts(id, products, catalog){
        let result = '';
        products.forEach(product =>{
            if(product.catId == id){
                result +=`
                <div class="card_product col-md-6 mt-5">
                    <div class="top">
                            <img src="${product.image}" alt="">
                    </div>
                    <div class="bottom">
                        <div class="info">
                            <h4>${product.title}</h4>
                            <ul>
                                <li>Lorem, ipsum dolor.</li>
                                <li>Tempore, explicabo soluta?</li>
                                <li>Id, ut repellendus!</li>
                                <li>Sed, eligendi obcaecati.</li>
                                <li>Officiis, nobis eius.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                `
            }
        })
        backbtn.style.display = "block" 
        catalogList.innerHTML = result;
        this.backBtn(catalog, products);
    }
    backBtn(catalog, products){
        backbtn.addEventListener("click", ()=>{
            this.displayCatalog(catalog, products);
        })
    }

}


const catalogList = document.querySelector('.catalog-list');
const backbtn = document.querySelector('.backbtn')

document.addEventListener('DOMContentLoaded', ()=>{
    const products = new Products;
    const ui = new UI;

    products.getCatalog()
    .then((catalog) => {
        products.getProducts()
        .then(product =>{
            ui.displayCatalog(catalog, product);
        })
    })

})

