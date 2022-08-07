document.addEventListener("DOMContentLoaded", () => {
    //let inputSave = document.getElementById('saveProduct');
    //inputSave.addEventListener('click', addProduct)
    getProducts();

    function getProducts() {
        fetch('/products.data')
        .then(response =>  response.json() )
        .then(data => renderProd(data.products));
    }

    function renderProd(data) {
        renderTitle(data);
        renderThumbnail(data);
        renderPrice(data);
    }
    function renderTitle(data) {
        const html = data.map((elem, index) => {
            return(
                `
                <div style="height: 50px;">${elem.name}</div>
                `
            )
        }).join(" ");
        document.getElementById('title_set').innerHTML = html;
    }
    function renderPrice(data) {
        const html = data.map((elem, index) => {
            return(
                `<div style="height: 50px;" >${elem.price}</div>`
            )
        }).join(" ");
        document.getElementById('price_set').innerHTML = html;
    }
    function renderThumbnail(data) {
        const html = data.map((elem, index) => {
            return(
                `
                <div ><img class="card-img-top"  src=${elem.thumbnail} alt="" width="50" height="50"  /></div>
                
                `
            )
        }).join(" ");
        document.getElementById('thumbnail_set').innerHTML = html;
    }
/*
    function addProduct(event) {
        event.preventDefault();

        let data = {
            name: document.getElementById('name').value,
            price: document.getElementById('price').value,
            thumbnail: document.getElementById('thumbnail').value 
        }
        
        fetch('/products', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .catch(error => console.log("Error: ", error))
        .then(data => {
            renderProd(data)
        })

        document.getElementById('name').value = '';
        document.getElementById('price').value = '';
        document.getElementById('thumbnail').value = '';
        return false;
    } */

});