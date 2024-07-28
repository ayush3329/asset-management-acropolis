import torch
from torchvision import transforms as tt
from torchvision import models
import torch.nn as nn
import torch.nn.functional as f
from PIL import Image

def accuracy(outputs,labels):
    _, preds = torch.max(outputs,dim=1)
    return torch.tensor(torch.sum(preds == labels).item() / len(preds))

class ImageClassifier(nn.Module):
    def __init__(self, num_classes):
        super(ImageClassifier, self).__init__()
        self.model = models.resnet18(pretrained=True)
        # Replace the final fully connected layer
        self.model.fc = nn.Linear(self.model.fc.in_features, num_classes)
    
    def forward(self, x):
        return self.model(x)
    
    def training_step(self, batch):
        images, labels = batch 
        out = self(images)                  # Generate predictions
        loss = f.cross_entropy(out, labels) # Calculate loss
        return loss
    
    def validation_step(self, batch):
        images, labels = batch 
        out = self(images)                    # Generate predictions
        loss = f.cross_entropy(out, labels)   # Calculate loss
        acc = accuracy(out, labels)           # Calculate accuracy
        return {'val_loss': loss.detach(), 'val_acc': acc}
        
    def validation_epoch_end(self, outputs):
        batch_losses = [x['val_loss'] for x in outputs]
        epoch_loss = torch.stack(batch_losses).mean()   # Combine losses
        batch_accs = [x['val_acc'] for x in outputs]
        epoch_acc = torch.stack(batch_accs).mean()      # Combine accuracies
        return {'val_loss': epoch_loss.item(), 'val_acc': epoch_acc.item()}
    
    def epoch_end(self, epoch, result):
        print("Epoch [{}], last_lr: {:.5f},train_loss: {:.4f}, val_loss: {:.4f}, val_acc: {:.4f}".format(epoch,result['lrs'][-1], result['train_loss'], result['val_loss'], result['val_acc']))

    def preprocess_image(self, image_path):
        transform = tt.Compose([
            tt.Resize((64, 64)),
            tt.ToTensor(),
            tt.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ])
        image = Image.open(image_path).convert('RGB')
        image = transform(image).unsqueeze(0)  # Add batch dimension
        return image

    def predict(self, image_path):
        image_tensor = self.preprocess_image(image_path)
        self.eval()
        with torch.no_grad():
            output = self(image_tensor)
            _, predicted = torch.max(output, 1)
            return predicted.item()
        
print("No error")