import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordToPdfService, ConversionProgress, ConversionResult } from '@services/feature-services/word-to-pdf.service';
import { ToastService } from '@services/helper-services/toast.service';

interface ConvertedFile {
  name: string;
  size: number;
  data: Blob;
}

@Component({
  selector: 'app-convert-word-to-pdf',
  imports: [CommonModule],
  templateUrl: './convert-word-to-pdf.component.html',
  styleUrl: './convert-word-to-pdf.component.scss'
})
export class ConvertWordToPdfComponent {
 
  //#region Component Properties
  selectedFile: File | null = null;
  convertedFile: ConvertedFile | null = null;
  isDragOver = false;
  isConverting = false;
  conversionProgress = 0;
  conversionStatus = '';
  maxFileSize = 50 * 1024 * 1024; // 50MB
  errorMessage = '';
  //#endregion

  constructor(private wordToPdfService: WordToPdfService, private toastService: ToastService) {}
  
  //#region Drag and Drop Handlers
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFileSelection(files[0]);
    }
  }
  //#endregion

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      this.handleFileSelection(files[0]);
    }
  }

  private handleFileSelection(file: File): void {
    const validation = this.wordToPdfService.validateFile(file);
    
    if (!validation.valid) {
      this.errorMessage = validation.error || 'Invalid file selected';
      return;
    }

    this.selectedFile = file;
    this.convertedFile = null;
    this.errorMessage = '';
  }

  removeFile(event: Event): void {
    event.stopPropagation();
    this.selectedFile = null;
    this.convertedFile = null;
    //Reset input file value to allow re-selection of the same file
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
      console.log('File input value reset');
    }
  }

  formatFileSize(bytes: number): string {
    return this.wordToPdfService.formatFileSize(bytes);
  }

  convertFile(): void {
    if (!this.selectedFile) return;

    this.isConverting = true;
    this.conversionProgress = 0;
    this.conversionStatus = 'Preparing file for conversion...';
    this.errorMessage = '';

    // For demo purposes, we'll simulate the conversion
    // In production, uncomment the service call below:
    
    this.wordToPdfService.convertWordToPdf(this.selectedFile).subscribe({
      next: (event) => {
        if ('progress' in event) {
          // This is a progress update
          const progressEvent = event as ConversionProgress;
          this.conversionProgress = progressEvent.progress;
          this.conversionStatus = progressEvent.status;
        } else {
          // This is the final result
          const result = event as ConversionResult;
          this.convertedFile = {
            name: result.fileName,
            size: result.fileData.size,
            data: result.fileData
          };
          this.isConverting = false;
          this.conversionProgress = 100;
          this.conversionStatus = 'Conversion complete!';
        }
      },
      error: (error) => {
        console.error('Conversion failed:', error);
        this.errorMessage = 'Conversion failed. Please try again.';
        this.convertedFile = null; // Clear any existing converted file
        this.resetConversionState();
      }
    });

    // Demo simulation - remove this in production
    this.simulateConversion();
  }

  private simulateConversion(): void {
    // Simulate conversion progress for demo
    this.simulateConversionProgress().then(() => {
      this.simulateSuccessfulConversion();
    }).catch((error) => {
      console.error('Demo conversion failed:', error);
      this.errorMessage = 'Demo conversion failed. In production, this would call the real API.';
      this.resetConversionState();
    });
  }

  private async simulateConversionProgress(): Promise<void> {
    const steps = [
      { progress: 20, status: 'Uploading file...' },
      { progress: 40, status: 'Analyzing document structure...' },
      { progress: 60, status: 'Converting to PDF format...' },
      { progress: 80, status: 'Optimizing PDF...' },
      { progress: 100, status: 'Conversion complete!' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      this.conversionProgress = step.progress;
      this.conversionStatus = step.status;
    }
  }

  private async simulateSuccessfulConversion(): Promise<void> {
    // In a real implementation, this would be the actual PDF blob from the server
    const pdfBlob = new Blob(['Sample PDF content'], { type: 'application/pdf' });
    
    this.convertedFile = {
      name: this.selectedFile!.name.replace(/\.(doc|docx)$/i, '.pdf'),
      size: pdfBlob.size,
      data: pdfBlob
    };

    this.isConverting = false;
    this.conversionProgress = 100;
    this.conversionStatus = 'Ready for download!';
  }

  downloadFile(): void {
    if (!this.convertedFile) return;

    const url = window.URL.createObjectURL(this.convertedFile.data);
    const link = document.createElement('a');
    link.href = url;
    link.download = this.convertedFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  resetConverter(): void {
    this.selectedFile = null;
    this.convertedFile = null;
    this.resetConversionState();
  }

  private resetConversionState(): void {
    this.isConverting = false;
    this.conversionProgress = 0;
    this.conversionStatus = '';
    this.isDragOver = false;
  }
}
