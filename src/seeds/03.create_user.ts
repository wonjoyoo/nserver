import {Factory, Seeder} from 'typeorm-seeding';
import {Connection} from 'typeorm';
import {User} from '../entities/User';

export class CreateInitialUserData implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(User)
            .values([
                {
                    id: 1,
                    name: 'wonjo',
                },
                {
                    id: 2,
                    name: 'wyatt',
                },
                {
                    id: 3,
                    name: 'jason',
                },
            ])
            .execute();
    }
}

