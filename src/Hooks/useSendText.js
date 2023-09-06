import { useMutation, useQueryClient } from "react-query";
import { SendText } from "../Services/apiSendText";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export function useSendText() {
    const queryClient = useQueryClient();
    const navigate=useNavigate()
  
    const { mutate: newTextHandler, isLoading } = useMutation({
      mutationFn: ({ contactId, content, type, 
        messageHistoryPreviewThumbnail, messagePreviewThumbnail}) => 
        SendText({ contactId, content, type, messageHistoryPreviewThumbnail, messagePreviewThumbnail}),
      onSuccess: (newText) => {
        queryClient.setQueryData(['sendText'], newText);
        navigate('/conversation', {replace:true})
        toast.success('Message Sent Successfully');
      },
      onError: (error) => {
        toast.error('Message Not Sent');
      },
    });
  
    return { newTextHandler, isLoading };
  }