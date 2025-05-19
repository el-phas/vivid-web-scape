
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Briefcase } from 'lucide-react';

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreatePostDialog: React.FC<CreatePostDialogProps> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();

  const handleOptionClick = (path: string) => {
    onOpenChange(false);
    navigate(path);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Create New</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4 py-4">
          <Button 
            variant="outline" 
            className="flex justify-start items-center p-6 hover:bg-blue-50"
            onClick={() => handleOptionClick("/business-product-post")}
          >
            <ShoppingBag className="mr-3 h-5 w-5 text-reachmesh-blue" />
            <div className="text-left">
              <p className="font-medium">Add Product</p>
              <p className="text-xs text-gray-500">List a product from your business</p>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex justify-start items-center p-6 hover:bg-blue-50"
            onClick={() => handleOptionClick("/business-services-post")}
          >
            <Briefcase className="mr-3 h-5 w-5 text-reachmesh-blue" />
            <div className="text-left">
              <p className="font-medium">Business Post</p>
              <p className="text-xs text-gray-500">Create a post for your business</p>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
