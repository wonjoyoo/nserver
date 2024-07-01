
import { IncomingWebhook } from '@slack/webhook';
import HttpsProxyAgent from 'https-proxy-agent';

export default class SlackLog {
    static async send(sendType: string, msg: string){
        const url = process.env.SLACK_WEBHOOK_URL || '';
        const webhook = new IncomingWebhook(url);
        await webhook.send({
            text: `[${sendType}] ${msg}`
        });
    }
    static async critical(msg: string){
        SlackLog.send('critical', msg);
    }
    static async info(msg: string){
        SlackLog.send('info', msg);
    }
    static async debug(msg: string){
        SlackLog.send('debug', msg);
    }

}
