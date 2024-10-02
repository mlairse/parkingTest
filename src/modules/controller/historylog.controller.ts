import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';

//Para determinar los roles y permisos
import { AuthGuard } from '@nestjs/passport';
import { RolType } from '../enums/roltype.enum';
import { HistorylogService } from '../services/historylog.service';
import { Historylog } from '../entity/historylog.entity';
import { Roles } from '../auth/decorators/role.decorator';

@Controller('historylog')
export class HistorylogController {
    constructor(private readonly _historyServices: HistorylogService) { }

    @Roles(RolType.ADMIN)
    @UseGuards(AuthGuard())
    @Post()
    createHistory(@Body() body: Historylog): Promise<any> {
        return this._historyServices.create(body);
    }

    @Roles(RolType.ADMIN)
    @UseGuards(AuthGuard())
    @Get()
    getAll(): Promise<Historylog[]> {
        return this._historyServices.getAll();
    }
}
