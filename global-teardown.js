import fs from 'fs';

export default async function globalTeardown() {
    const filePath = 'data/storageState.json';

    console.log('globalTearDown: started');
    if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
        console.log('storageState deleted'); 
    }
    console.error('globalTearDown: finished');
}