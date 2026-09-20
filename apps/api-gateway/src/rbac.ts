import{ UserRole } from "@nodejsmicroservices/packages-shared";

export enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}

export type RbacRule = {
    method: HttpMethod | HttpMethod[] | "*" ;
    path: string;
    roles?: UserRole | UserRole[] | "*" ;
}

export const publicRoutes: RbacRule[] = [
    {
        method: HttpMethod.POST,
        path: "/auth/login",
    },
    {
        method: HttpMethod.POST,
        path: "/auth/register",
    },
] as const;

export const protectedRoutes: RbacRule[] = [
    {
        method: HttpMethod.GET,
        path: "/auth/me",
        roles: UserRole.USER,
    }
] as const;

function matchPath(pattern: string, actual: string): boolean {
    const patternParts = pattern.split("/");
    const actualParts = actual.split("/");
    if(patternParts.length !== actualParts.length){
        return false;
    }
    for(let i = 0; i < patternParts.length; i++){
        const patternPart = patternParts[i]!;
        const actualPart = actualParts[i]!;
        if(patternPart.startsWith(":")){
            // this is dynamic part, so we need not to match the actualPart with the patternPart
            continue;
        }else if(patternPart !== actualPart){
            return false;
        }
    }

    return true;
}

export function isPublicRoute(rule: { method: HttpMethod, path: string }): boolean {
    return publicRoutes.some(publicRoute => matchPath(publicRoute.path, rule.path));
}

export function getAllowedRoles(rule: { method: HttpMethod, path: string }): UserRole[] | undefined {
    const currentRule = protectedRoutes.find(r => matchPath(r.path, rule.path));
    if(!currentRule){
        return;
    }
    if(currentRule.roles === '*'){
        return Object.values(UserRole);
    }
    if(!currentRule.roles){
        return;
    }
    return Array.isArray(currentRule.roles) ? currentRule.roles : [currentRule.roles];
}