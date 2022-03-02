import {BreakerStates} from "./BreakerStates"
import {BreakerOptions} from "./BreakerOptions"
import {Axios, AxiosRequestConfig} from 'axios';

const axios = require('axios');

export class CircutBreaker {

    private request : AxiosRequestConfig;
    private state : BreakerStates;

    private failureCount: number;
    private successCount : number;
    private nextAttempt :number;

    private failureThreshold : number;
    private successThreshold : number;
    private timeout : number;

    constructor(request : AxiosRequestConfig, Options? : BreakerOptions) { 

        this.request = request;
        this.state = BreakerStates.GREEN;

        this.failureCount = 0;
        this.successCount = 0;
        this.nextAttempt = Date.now();

        if(Options){
            this.failureThreshold = Options.failureThreshold;
            this.successThreshold = Options.successThreshold;
            this.timeout = Options.timeout;
        }
        else{
            this.failureThreshold = 3;
            this.successThreshold = 2;
            this.timeout = 3500;
        }
     }

     private log(result : string) : void {
         console.table({
            Result : result,
            Failures : this.failureThreshold,
            Successes : this.successThreshold,
            State : this.state,
            Timestamp :Date.now()
         })
     }
    
     public async exe(): Promise<void> {
        if(this.state == BreakerStates.RED){

            if(this.nextAttempt <= Date.now()){
                this.state = BreakerStates.YELLOW;
            }
            else{
                throw new Error("circut broke, access denied..")
            }
        }
        try {
            const res = await axios(this.request);
            if(res == 200){
                // return success(res.data())
            }
            else{
                // return failure(res.data())
            }
        } catch (err) {
            // return failure(err.)
        }
     }

     private success(res : any): any {
         this.failureCount = 0;
         if(this.state == BreakerStates.YELLOW){
             this.successCount++;

             if(this.successCount > this.successThreshold){
                 this.successCount = 0;
                 this.state = BreakerStates.GREEN;
             }
           
         }
         this.log("success");
         return res;
     }

     private failure(res : any): any {
        this.failureCount = 0;
      
            if(this.successCount > this.successThreshold){
                this.nextAttempt = Date.now() + this.timeout;
                this.state = BreakerStates.RED;
            }
        
        this.log("failure");
        return res;
    }
}