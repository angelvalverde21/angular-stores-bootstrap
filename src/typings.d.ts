declare global {
  interface USBDevice {
    productName: string;
    vendorId: number;
    productId: number;
    open(): Promise<void>;
    close(): Promise<void>;
    claimInterface(interfaceNumber: number): Promise<void>;
    transferOut(endpoint: number, data: ArrayBufferView): Promise<void>;
    transferIn(endpoint: number, length: number): Promise<DataView>;
  }

  interface Navigator {
    usb: USB;
  }
}

// Asegúrate de que el archivo sea tratado como un módulo.
export {};