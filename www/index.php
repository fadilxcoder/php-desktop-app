<?php

shell_exec("{$_ENV['DOCUMENT_ROOT']}\bash\setup.sh");
header("Refresh:0");
exit;