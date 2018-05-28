import { Controller, Get, Delete, Request, Response, Body, Param, HttpStatus, Post, Put } from '@nestjs/common';
import { MedicineService } from './medicine.service';


@Controller('medicines')
export class MedicineController{
    constructor(private medicineService : MedicineService){}


    @Post('/create')
    public async CreateMedicine(
        @Request() req,
        @Response() res,
        @Body('nombre') nombre,
        @Body('descripcion') descripcion
    ){
        const response = await this.medicineService.CreateMedicine(nombre, descripcion)
        res.status(HttpStatus.OK).json(response)
    }

    @Put('/update')
    public async UpdateMedicine(
        @Request() req,
        @Response() res,
        @Body('idMedicamento') idMedicamento,
        @Body('nombre') nombre,
        @Body('descripcion') descripcion
    ){
        const residenceplace = await this.medicineService.UpdateMedicine(idMedicamento, nombre, descripcion)
        res.status(HttpStatus.OK).json(residenceplace)
    }

    @Get('/getOne/:idMedicine')
    public async getMedicine(
        @Request() req,
        @Response() res,
        @Param('idMedicine') idMedicine
    ){
        console.log(idMedicine)
        const medicine = await this.medicineService.getMedicine(idMedicine)
        res.status(HttpStatus.OK).json(medicine)
    }

    @Get('/All')
    public async getAllMedicines(
        @Request() req,
        @Response() res,
    ){
        const medicines = await this.medicineService.getAllMedicines()
        res.status(HttpStatus.OK).json(medicines)
    }

    @Delete('/delete/:idMedicamento')
    public async DeleteResidencePlace(
        @Request() req,
        @Response() res,
        @Param('idMedicamento') idMedicamento
    ){
        const response = await this.medicineService.DeleteMedicine(idMedicamento)
        res.status(HttpStatus.OK).json(response)
    }

}