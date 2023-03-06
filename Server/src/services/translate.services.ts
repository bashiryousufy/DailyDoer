const { Translate } = require('@google-cloud/translate').v2;

// translate the text into target language
const translate = async (text: string, target: string) => {
    try {

        const projectId = process.env.GC_PROJECT_ID;

        const translate = new Translate({ projectId });

        const [translation] = await translate.translate(text, target);

        return translation;

    } catch (error) {
        console.log(error);
    }
}

export {
    translate
}