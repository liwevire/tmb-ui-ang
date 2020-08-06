import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../customers/customer.service';
import { Observable } from 'rxjs';

@Injectable()
export class Globals {
  nameSet: string[];
  postSet: string[];
  itemSet: string[] = [
    'Necklace',
    'Modhiram',
    'Mattal',
    'Thodu thongal',
    'Kasu',
    'Jimikki',
    'Thodu',
    'Kasu malai',
    'Kal thodu',
    'Ring',
    'Valayal',
    'Kai chain',
    'Dollar chain',
    'Kal modhiram',
    'Chain',
    'Chain (paludhu)',
    'Kal thodu jimikki',
    'Modhiram (paludhu)',
    'Thodu jimikki',
    'KPS Modhiram (nool)',
    'Meen dollar chain',
    'Chain (kokki paludhu)',
    'Mattal (1 kal illai paludhu)',
    'Necklace (paludhu)',
    'Mani',
    'Pottu',
    'Ma kasu',
    'Meen dollar',
    'Baby valayal',
    'Mani (nool)',
    'Thayathu',
    'Kal thodu thongal (paludhu)',
    'Dollar',
    'Modhiram (nool)',
    'Mattal (paludhu)',
    'Chain (kokki illai)',
    'Thodu (paludhu)',
    'Kai thodu jimikki',
    'Om dollar chain',
    'Thali kasu',
    'Yanai mudi ring',
  ];
}
