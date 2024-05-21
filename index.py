from docx2pdf import convert
import sys

def main():
    if len(sys.argv) != 3:
        print("Usage: python index.py input.docx output.pdf")
        sys.exit(1)
    
    input_docx = sys.argv[1]
    output_pdf = sys.argv[2]
    
    convert(input_docx, output_pdf)

if __name__ == "__main__":
    main()
