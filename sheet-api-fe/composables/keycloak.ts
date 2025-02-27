
export const useKC = () => useState<{}>('KC', () => {
    return {
        email: '',
        name: '',
        authenticated: false
    }
})
