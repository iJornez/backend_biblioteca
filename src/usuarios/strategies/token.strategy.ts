import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TokenPayload } from "../interfaces/token-strategy.interface";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject(JwtService) private jwtService: JwtService, private readonly configService: ConfigService) {
        super({
            secretOrKey: configService.get<string>('SECRET'),
            jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token')
        });
    }

    async generateToken(payload: TokenPayload): Promise<any> {
        const infoToken = {
            sub: payload.cedula,
            cedula: payload.cedula
        }
        return await this.jwtService.signAsync(infoToken);
    }

    /**
     * 
     * @param token Token generado por generateToken()
     * @returns Retorna true, si el token no ha expirado, false en otros casos
     */
    async validateToken(token: string): Promise<boolean> {
        try {
            await this.jwtService.verifyAsync(token);
            return true;
        } catch (error) {
            return false;
        }
    }
}