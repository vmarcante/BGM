import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-filtro-extrato',
    templateUrl: './filtro-extrato.component.html',
    styleUrls: ['./filtro-extrato.component.scss'],
})
export class FiltroExtratoComponent implements OnInit {
    filterForm: FormGroup;
    constructor(
        private form: FormBuilder,
    ) {
        this.filterForm = this.form.group({
            mes: new FormControl("", [Validators.max(12), Validators.min(0)]),
            ano: new FormControl(new Date().getFullYear(), [Validators.max(9999), Validators.min(0)]),
            receitasCheck: new FormControl(false, [Validators.max(100), Validators.min(0)]),
            despesasCheck: new FormControl(false),
        })
    }

    ngOnInit(): void { }

    tratarCheckBox(tipo: string) {
        this.filterForm.get(tipo == 'despesa' ? 'receitasCheck' : 'despesasCheck')?.setValue(false)
    }
}
