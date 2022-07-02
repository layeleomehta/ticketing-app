export const natsWrapper = {
    hello: "HI",
    client: {
        publish: (subject: string, data: string, callback: () => void) => {
            callback(); 
        }
    }
}; 