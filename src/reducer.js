export const reducer = (state, action) => {
    switch(action.type) {
    case 'ACTIVATED':
        return {
            images: state.images,
            activeId: action.id
        };

    case 'DRAGGED':
        return {
            images: [
                ...state.images.filter(image => image.id !== action.id),
                Object.assign({},
                    state.images.filter(image => image.id === action.id)[0],
                    {location: action.location})
            ],
            activeId: action.id
        };

    case 'ROTATED':
        return {
            images: [
                ...state.images.filter(image => image.id !== action.id),
                Object.assign({},
                    state.images.filter(image => image.id === action.id)[0],
                    {rotation: action.rotation})
            ],
            activeId: action.id
        };
    default:
        return state;
    }
};
