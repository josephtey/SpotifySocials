import axios from 'axios'

const obscurify = axios.create({
  baseURL: 'https://ktp0b5os1g.execute-api.us-east-2.amazonaws.com/dev'
});

export const getObscurifyPercentile = async (recentObscurifyScore, allTimeObscurifyScore) => {
  const obscurifyData = await obscurify.get(`/getObscurifyData?code=US&obscurifyScore=${allTimeObscurifyScore}&recentObscurifyScore=${recentObscurifyScore}`)
  return {
    allTimeObscurifyPercentile: Math.round(obscurifyData.data.percentileByCountryAllTime),
    recentObscurifyPercentile: Math.round(obscurifyData.data.percentileByCountryRecent)
  }
}