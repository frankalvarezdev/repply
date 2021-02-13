import Fuse from 'fuse.js';
import default_data from './data';

/**
  * @param text Recibe el mensaje 
  * @returns Retorna el mensaje adecuado
  */
export = (text: string, config: { data: any[], default_data: boolean, error_message: string } = {
    data: null, default_data: true, error_message: "Lo siento, no puedo entender lo que tratas de decir"
}) => {

    let data: any[];
    config = {
        data: typeof config.data !== 'undefined' ? config.data : null,
        default_data: typeof config.default_data !== 'undefined' ? config.default_data : true,
        error_message: typeof config.error_message !== 'undefined' ? config.error_message : "Lo siento, no puedo entender lo que tratas de decir"
    }

    if (config.data != null && config.default_data) {
        data = [...default_data, ...config.data];
    } else if (config.data != null) {
        data = config.data
    } else {
        data = default_data
    }

    const fuseOptions = {
        includeScore: true,
        keys: ['text']
    }

    const fuse = new Fuse(data, fuseOptions)
    const result = fuse.search((text).toUpperCase())

    let scoreData: number = 0;
    let reply: string = null;

    result.forEach(res => {
        let score = parseFloat((res.score).toString().slice(0, 5));
        if (score > scoreData) {
            scoreData = score;
            const n: number = Math.floor(Math.random() * (res.item.reply).length);
            reply = res.item.reply[n];
        }
    });

    if (scoreData > 0.6) {
        return reply;
    } else {
        return config.error_message;
    }
}