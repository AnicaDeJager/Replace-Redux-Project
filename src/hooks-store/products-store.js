import { initStore } from "./store";

//set up actions and initial state
const configureProductsStore = () => {
  const actions = {
    //put identifiers here
    TOGGLE_FAV: (curState, productId) => {
      const prodIndex = curState.products.findIndex((p) => p.id === productId);
      const newFavStatus = !curState.products[prodIndex].isFavorite;
      const updatedProducts = [...curState.products];
      updatedProducts[prodIndex] = {
        ...curState.products[prodIndex],
        isFavorite: newFavStatus,
      };

      return { products: updatedProducts };
    },
  };
  initStore(actions, {
    products: [
      {
        id: "p1",
        title: "Red dress",
        description: "A gorgeous red dress.",
        isFavorite: false,
      },
      {
        id: "p2",
        title: "Purple hat",
        description: "A nice purple hat.",
        isFavorite: false,
      },
      {
        id: "p3",
        title: "Blue earrings",
        description: "These earrings are stunning.",
        isFavorite: false,
      },
      {
        id: "p4",
        title: "Pink blouse",
        description: "A delicate pink blouse.",
        isFavorite: false,
      },
    ],
  });
};

export default configureProductsStore;
