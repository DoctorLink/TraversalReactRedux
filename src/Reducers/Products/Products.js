import { CLIENT_PRODUCTS_SET } from "../../Actions";

const clientProducts = (state = [], action) => {
    switch (action.type) {
        case CLIENT_PRODUCTS_SET:
            return action.products;
        default:
            return state;
    }
}

export default clientProducts;