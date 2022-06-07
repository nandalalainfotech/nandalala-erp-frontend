import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// import { MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule } from '@angular/material';



@NgModule({
    exports: [FormsModule, MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule],
    // providers: [ MatDialogRef],
})
export class MaterialModule { }


// MatFormFieldModule, MatButtonModule, MatInputModule