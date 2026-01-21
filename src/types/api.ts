export type LoginData = {
    email: string;
    password: string;
};
export type LoginResponseData = {
    token: string;
    user: {
        id: string;
        email: string;
    }
};
export type postItemData = {
    id: string;
    userId: string;
    title: string;
    body: string;
    category: string;
    tags: string[];
    createdAt: string;
}
export type postGetReqData = {
    limit?: number;
    prevCursor?: string;
    nextCursor?: string;
    sort?: 'createdAt' | 'title';
    order?: 'asc' | 'desc';
    category?: Category;
    from?: string;
    to?: string;
    search?: string;
}
export type postGetMyResData = {
    items: postItemData[];
    nextCursor: string;
    prevCursor: string;
}
export type postGetResData = {
    items: postItemData[];
    count: number;
}
export type singlePostUpdateReqData = {
    title?: string;
    body?: string;
    category?: Category;
    tags?: string[];
}


export enum Category {
    NOTICE = 'NOTICE',
    QNA = 'QNA',
    FREE = 'FREE'
}

export type postUpdateReqData = {
    title: string;
    body: string;
    category: Category;
    tags: string[];
}
export type topCoffeeBrandData = {
    brand: string;
    popularity: number;
}

export type topCoffeeBrandResData = topCoffeeBrandData[]

export type popularSnackData = {
    name: string;
    share: number;
}
export type popularSnackResData = popularSnackData[]

export type weeklyMoodTrendData = {
    week: string;
    happy: number;
    tired: number;
    stressed: number;
}
export type weeklyMoodTrendResData = weeklyMoodTrendData[]

export type weeklyWorkoutTrendData = {
    week: string;
    running: number;
    cycleing: number;
    stretching: number;
}

export type weeklyWorkoutTrendResData = weeklyWorkoutTrendData[]

export type coffeeConsumptionData = {
    team: string;
    series: {
        cups: number;
        bugs: number;
        productivity: number;
    }[]
}

export type coffeeConsumptionResData = {
    teams: coffeeConsumptionData[];
}

export type snackImpactData = {
    name: string
    metrics: {
        snacks: number;
        meetingsMissed: number;
        morale: number;
    }[]
}
export type snackImpactResData = {
    departments: snackImpactData[];
}