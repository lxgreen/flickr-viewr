export const reducer = (state, action) => {

    switch(action.type) {

    case 'ACTIVATED':
        return Object.assign({}, state, { activeId: action.id });

    case 'DRAGGED':
        return {
            images: [
                ...state.images.filter(image => image.id !== action.id),
                Object.assign({},
                    state.images.filter(image => image.id === action.id)[0],
                    {location: action.location})
            ],
            activeId: action.id,
            imagesToResolve: state.imagesToResolve
        };

    case 'ROTATED':
        return {
            images: [
                ...state.images.filter(image => image.id !== action.id),
                Object.assign({},
                    state.images.filter(image => image.id === action.id)[0],
                    {rotation: action.rotation})
            ],
            activeId: action.id,
            imagesToResolve: state.imagesToResolve
        };

    case 'IMAGE_LOADED':
        return Object.assign({}, state, {
            imagesToResolve: Math.max(0, state.imagesToResolve - 1)
        });

    case 'IMAGE_ERROR':
        return {
            images: state.images.filter(image => image.id !== action.id),
            activeId: state.activeId === action.id ? state.images[0].id : state.activeId,
            imagesToResolve: Math.max(0, state.imagesToResolve - 1)
        };

    default:
        return state;
    }
};
