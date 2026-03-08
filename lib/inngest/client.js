import {Inngest} from "inngest";

export const inngest = new Inngest({ 
    id: "SWC",
    name:'Spend Wise Campus',
retryFunction: async(attempt) => ({
    delay: Math.pow(2,attempt) * 1000,
    maxAttempsts: 2,
})});