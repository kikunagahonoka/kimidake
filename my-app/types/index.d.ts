export type NavItem ={
    title: string;
    href: string;
    disabled?: boolean;
};

export type siteConfig={
    neme: string;
    description: string;
    url: string;
    ogImage: string;
    links{
        x: string;
        github: string;
    };
};

export type MarketingConfig = {
    mainNav:Navitem[];
};