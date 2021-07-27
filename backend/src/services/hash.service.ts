import { Injectable } from "@nestjs/common";
import { hash, compare } from "bcrypt";

@Injectable()
export class HashService {
    hash(plainText: string, salt: number = 10): Promise<string> {
        return new Promise((resolve, reject) => {
            hash(plainText, salt, (err, hash) => {
                if (err) return reject(err);
                return resolve(hash);
            });
        });
    }

    compare(plainText: string, hash: string): Promise<Boolean> {
        return new Promise((resolve, reject) => {
            compare(plainText, hash, (err, result) => {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    }
}
