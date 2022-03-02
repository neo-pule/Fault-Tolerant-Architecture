"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircutBreaker = void 0;
const BreakerStates_1 = require("./BreakerStates");
const axios = require('axios');
class CircutBreaker {
    constructor(request, Options) {
        this.request = request;
        this.state = BreakerStates_1.BreakerStates.GREEN;
        this.failureCount = 0;
        this.successCount = 0;
        this.nextAttempt = Date.now();
        if (Options) {
            this.failureThreshold = Options.failureThreshold;
            this.successThreshold = Options.successThreshold;
            this.timeout = Options.timeout;
        }
        else {
            this.failureThreshold = 3;
            this.successThreshold = 2;
            this.timeout = 3500;
        }
    }
    log(result) {
        console.table({
            Result: result,
            Failures: this.failureThreshold,
            Successes: this.successThreshold,
            State: this.state,
            Timestamp: Date.now()
        });
    }
    exe() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.state == BreakerStates_1.BreakerStates.RED) {
                if (this.nextAttempt <= Date.now()) {
                    this.state = BreakerStates_1.BreakerStates.YELLOW;
                }
                else {
                    throw new Error("circut broke, access denied..");
                }
            }
            try {
                const res = yield axios(this.request);
                if (res == 200) {
                    // return success(res.data())
                }
                else {
                    // return failure(res.data())
                }
            }
            catch (err) {
                // return failure(err.)
            }
        });
    }
    success(res) {
        this.failureCount = 0;
        if (this.state == BreakerStates_1.BreakerStates.YELLOW) {
            this.successCount++;
            if (this.successCount > this.successThreshold) {
                this.successCount = 0;
                this.state = BreakerStates_1.BreakerStates.GREEN;
            }
        }
        this.log("success");
        return res;
    }
    failure(res) {
        this.failureCount = 0;
        if (this.successCount > this.successThreshold) {
            this.nextAttempt = Date.now() + this.timeout;
            this.state = BreakerStates_1.BreakerStates.RED;
        }
        this.log("failure");
        return res;
    }
}
exports.CircutBreaker = CircutBreaker;
//# sourceMappingURL=CircutBreaker.js.map