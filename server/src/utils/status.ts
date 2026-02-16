export type WeatherDescription = "sunny" | "partly cloudy" | "overcast" | "fog" | "drizzle" | "rain" | "snow" | "storm" | "unknown"

export const weatherCodeConvertor = (code: number): WeatherDescription =>{
    if ([0].includes(code)) return "sunny";
    if ([1, 2].includes(code)) return "partly cloudy";
    if ([3].includes(code)) return "overcast";
    if ([45, 48].includes(code)) return "fog";
    if ([51, 53, 55, 56, 57].includes(code)) return "drizzle";
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "rain";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
    if ([95, 96, 99].includes(code)) return "storm";
    return "unknown";
}

export const isExpired = (date:Date, mins=15)=>{
    const now = new Date();
    const diff = (now.getTime() - date.getTime()) / (1000 * 60); // difference in minutes
    return diff > mins;
}