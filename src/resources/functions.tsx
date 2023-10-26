const functions = {
    awaitCursor: () => {
        document.body.style.cursor='wait';
    },
    
    defaultCursor: () => {
        document.body.style.cursor='default';
    }
}

export default functions;