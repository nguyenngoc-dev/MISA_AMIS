import { reactive, readonly} from 'vue';

const state = reactive({
    sidebar: {
        isOpen: true,
    },
    

})

const handleCloseSidebar = () => {
    state.sidebar.isOpen = false;
}

const handleOpenSidebar = () => {
    state.sidebar.isOpen = true;
}


export default {state: readonly(state), handleCloseSidebar, handleOpenSidebar};