import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import {Project} from './Project'

@Entity('assets')
export class Asset extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column({type: "json"})
    info: {};

    @ManyToOne(type => Project, project => project.assets)
    project: Project;
}