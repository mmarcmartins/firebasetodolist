import {handlePromise} from '.';

describe('HandlePromise', () => {
    it('Should return resolved Promise', async () => {        
        const [result, error] = await handlePromise(new Promise((resolve,_) => {
            setTimeout(() => {
                resolve('resolved');
            }, 0)
        }))
        expect(result).toBe('resolved');
        expect(error).toBe(null);
    })
    it('Should return reject Promise', async () => {        
        const [result, error] = await handlePromise(new Promise((_,reject) => {
            setTimeout(() => {
                reject('Error');
            }, 0)
        }))
        expect(result).toBe(null);
        expect(error).toBe("Error");
    })
})