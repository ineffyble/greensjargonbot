import 'dotenv/config';
import got from 'got';

const getExplanations = async () => {
    const explanations = await got(process.env.JARGON_API_URL).json();
    return explanations;
}

export const getExplanationsForTerm = async (term) => {
    const explanations = await getExplanations();
    const matched = Object.keys(explanations).find((e => e.toUpperCase() === term.toUpperCase()));
    if (!matched) {
        return null;
    }
    return {
        matched,
        values: explanations[matched]
    }
}