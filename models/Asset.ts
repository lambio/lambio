import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinTable } from "typeorm";
import { AfterUpdate, AfterInsert, AfterRemove, AfterLoad } from "typeorm";
import { Project } from './Project'
import { Pipeline } from "./concourse/Pipeline";

@Entity('assets')
export class Asset extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    name: string;

    @Column({ type: "text" })
    type: string;

    @Column({ type: "json" })
    info: {};

    @ManyToOne(type => Project, project => project.assets, { eager: true })
    @JoinTable()
    project: Project;
    
    pipeline: Pipeline

    @AfterLoad()
    initPipeline() {
        this.pipeline = new Pipeline(this)
    }

    @AfterInsert()
    createPipeline() { 
        this.initPipeline()    
        try {            
            this.pipeline.create()
        } catch (e) {
            throw new Error('Pipeline failed to create')
        }   
    }

    @AfterUpdate()
    updatePipeline() {
        try {
            this.pipeline.update()
        } catch (e) {
            throw new Error('Pipeline failed to update')
        }
    }

    @AfterRemove()
    removePipeline() {
        try {
            this.pipeline.remove()
        } catch (e) {
            throw new Error('Pipeline failed to remove')
        }
    }

    toJSON () {
        delete this.pipeline;
        return this;
    }
}