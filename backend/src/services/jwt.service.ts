import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";

@Injectable()
export class JwtService {
    // TODO: Add expiration date
    sign(payload: string | Buffer | object, secretKey: string) {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, secretKey, (err, token) => {
                if (err) return reject(err);
                resolve(token);
            });
        });
    }
}
